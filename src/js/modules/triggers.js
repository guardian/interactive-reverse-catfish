import 'intersection-observer';
import scrollama from 'scrollama';

let singleScroller, groupScroller, $activeContainer;

export default {
    init: function() {
        this.bindings();
        this.setGroupPadding();
    },

    bindings: function() {
        singleScroller = scrollama();
        singleScroller.setup({
            step: '.is-animatable',
            offset: 0.6,
            order: true
        })
        .onStepEnter(this.handleSingleStepEnter);

        groupScroller = scrollama();
        groupScroller.setup({
            container: '.is-group',
            graphic: '.is-group-graphic',
            text: '.is-group-text',
            step: '.is-group-step',
            offset: 0.3
        })
        .onStepEnter(this.handleGroupStepEnter.bind(this))
        .onContainerEnter(this.handleGroupContainerEnter)
        .onContainerExit(this.handleGroupContainerExit)

        $(window).resize(function() {
            this.setGroupPadding();
        }.bind(this));
    },

    setGroupPadding: function() {
        if (980 > $(window).width()) {
            $('.is-group').each(function(i, el) {
                var graphicHeight = $(el).find('.is-group-graphic').outerHeight();
                $(el).attr('style', 'padding: ' + graphicHeight + 'px 0;');
            }.bind(this));
        } else {
            $('.is-group').removeAttr('style');
        }

        singleScroller.resize();
        groupScroller.resize();
    },

    handleSingleStepEnter: function(obj) {
        const $step = $(obj.element);
        $step.addClass('is-animated')
    },

    handleGroupStepEnter: function(obj, i) {
        const $step = $(obj.element);
        $activeContainer = $step.parent().parent();

        let classesToRemove = '';

        for (var step in i) {
            if (obj.index < step) {
                classesToRemove += 'is-step-' + step + ' ';
            }
        }

        if (obj.direction === 'up' && obj.index === 0) {
            classesToRemove += 'is-step-0';
        }

        $activeContainer.addClass('is-step-' + obj.index).removeClass(classesToRemove);

        if (obj.index === i.length - 1) {
            this.checkForCount(obj.direction);
        }
    },

    checkForCount: function(direction) {
        var $count = $activeContainer.find('.uit-gloo-graphic__followers-count');

        if ($count) {
            const target = direction === 'down' ? 2000 : 4;
            $('.uit-gloo-graphic__followers-count').prop('Counter', 0).animate({
                Counter: target
            }, {
                duration: 1000,
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            })
        }
    },

    handleGroupContainerEnter: function(obj) {
        $('.is-group').addClass('is-fixed').removeClass('is-bottom');
    },

    handleGroupContainerExit: function(obj) {
        const classesToAdd = obj.direction === 'down' ? 'is-bottom' : '';
        $('.is-group').addClass(classesToAdd).removeClass('is-fixed')
    }
};

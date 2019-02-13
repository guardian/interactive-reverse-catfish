import 'intersection-observer';
import scrollama from 'scrollama';

let singleScroller, groupScrollers, $activeContainer;

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

        groupScrollers = [];

        $('.is-group').each(function(i, el) {
            let containerName = '.' + $(el).attr('class').split(' ')[0];

            let groupScroller = scrollama();
            groupScroller.setup({
                container: containerName,
                graphic: containerName + ' .is-group-graphic',
                text: containerName + ' .is-group-text',
                step: containerName + ' .is-group-step',
                offset: 0.3
            })
            .onStepEnter(this.handleGroupStepEnter.bind(this))
            .onContainerEnter(obj => this.handleGroupContainerEnter(obj, containerName))
            .onContainerExit(obj => this.handleGroupContainerExit(obj, containerName));

            groupScrollers.push(groupScroller);
        }.bind(this));

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

        for (var i in groupScrollers) {
            groupScrollers[i].resize();
        }
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

    handleGroupContainerEnter: function(obj, containerName) {
        $(containerName).addClass('is-fixed').removeClass('is-bottom');
    },

    handleGroupContainerExit: function(obj, containerName) {
        const classesToAdd = obj.direction === 'down' ? 'is-bottom' : '';
        $(containerName).addClass(classesToAdd).removeClass('is-fixed')
    }
};

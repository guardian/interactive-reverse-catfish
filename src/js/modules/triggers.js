import 'intersection-observer';
import scrollama from 'scrollama';

let singleScroller, groupScroller, $activeContainer;

export default {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        singleScroller = scrollama();
        singleScroller.setup({
            step: '.is-animatable',
            offset: 0.7
        })
        .onStepEnter(this.handleSingleStepEnter);

        groupScroller = scrollama();
        groupScroller.setup({
            container: '.is-group',
            graphic: '.is-group-graphic',
            text: '.is-group-text',
            step: '.is-group-step'
        })
        .onStepEnter(this.handleGroupStepEnter)
        .onContainerEnter(this.handleGroupContainerEnter)
        .onContainerExit(this.handleGroupContainerExit)

        $(window).resize(function() {
            singleScroller.resize();
            groupScroller.resize();
        }.bind(this));
    },

    handleSingleStepEnter: function(obj) {
        const $step = $(obj.element);
        $step.addClass('is-animated')
    },

    handleGroupStepEnter: function(obj, i) {
        const $step = $(obj.element);
        $activeContainer = $step.parent().parent();

        $activeContainer.removeClass((index, classes) => {
            return (classes.match (/(^|\s)is-step-\S+/g) || []).join(' ');
        }).addClass('is-step-' + obj.index);
    },

    handleGroupContainerEnter: function(obj) {
        console.log('enter');
        console.log($activeContainer);
        $activeContainer.addClass('is-fixed').removeClass('is-bottom');
    },

    handleGroupContainerExit: function(obj) {
        const classesToAdd = obj.direction === 'down' ? 'is-bottom' : '';
        console.log($activeContainer);
        console.log(classesToAdd);
        $activeContainer.addClass(classesToAdd).removeClass('is-fixed');
    }
};

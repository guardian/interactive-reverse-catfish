import 'intersection-observer';
import scrollama from 'scrollama';

let scrollWatcher;

export default {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        scrollWatcher = scrollama();
        scrollWatcher.setup({
            step: '.is-animatable',
            offset: 0.5
        })
        .onStepEnter(this.handleStepEnter)
        .onStepExit(this.handleStepExit);

        $(window).resize(function() {
            scrollWatcher.resize();
        }.bind(this));
    },

    handleStepEnter: function(obj) {
        const $step = $(obj.element);
        $step.addClass('is-animated')
    },

    handleStepExit: function(obj) {
        const $step = $(obj.element);
        // $step.removeClass('is-animated');
    }
};

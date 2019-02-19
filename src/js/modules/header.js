const animationLength = 1002;
const ranges = {
    'mobile': [0, 1, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'desktop': [0, 1, 2, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23],
    'wide': [0, 1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17]
};

let width;

export default {
    init: function() {
        this.setTimer();
        this.bindings();
        this.defineWidth();
    },

    bindings: function() {
        $(window).resize(function() {
            this.defineWidth();
        }.bind(this));
    },

    defineWidth: function() {
        if ($(window).width() > 1300) {
            width = 'wide'
        } else if ($(window).width() > 980) {
            width = 'desktop'
        } else {
            width = 'mobile';
        }
    },

    setTimer: function() {
        setInterval(function () {
            this.cleanUpOldClasses();
            this.animateRandomAvatar();
        }.bind(this), animationLength);
    },

    cleanUpOldClasses: function() {
        $('.uit-header__avatar').removeClass('is-left is-right');
    },

    animateRandomAvatar: function() {
        const direction = Math.floor(Math.random() * 2) == 0 ? 'is-left' : 'is-right';
        const avatar = ranges[width][Math.floor(Math.random() * ranges[width].length)];

        $('.uit-header__avatar--' + avatar).addClass(direction);
    }
};

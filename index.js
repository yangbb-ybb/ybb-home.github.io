// var app = new Vue({
//   el: '#app',
//   data: {
//     topSwiper: [
//       { img: './img/topSwiper/1.jpg' },
//       { img: './img/topSwiper/2.jpg' },
//       { img: './img/topSwiper/3.jpg' },
//       { img: './img/topSwiper/4.jpg' }
//     ],
//     nav: ['杭州', '嘉兴', '金华', '绍兴'],
//     areaSwiper: [
//       [{ name: '融信·江南学府' }, { name: '融信·澜天' }, { name: '融信公馆·ARC' }],
//       [{ name: '融信澜庭' }],
//       [{ name: '金地融信·悦江府' }],
//       [{ name: '融信·嵊州创世纪' }, { name: '融信·嵊州学院府' }]
//     ],
//     rySwiper: [
//       { img: './img/5.jpg' },
//       { img: './img/5.jpg' },
//       { img: './img/5.jpg' }
//     ]
//   },
// })

var topSwiper = new Swiper('.top-swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.top-pagination'
  }
})
var bottomSwiper = new Swiper('.bottom-swiper', {
  watchSlidesProgress: true,
  resistanceRatio: 0,
})
var barwidth = 36,
  tSpeed = 300 //切换速度300ms
var navSwiper = new Swiper('#nav', {
  slidesPerView: 4,
  freeMode: true,
  // noSwipingSelector: 'span',
  on: {
    init: function () {
      navSlideWidth = this.slides.eq(0).css('width') //导航字数需要统一,每个导航宽度一致
      bar = this.$el.find('.bar')
      bar.css('width', navSlideWidth)
      bar.transition(tSpeed)
      // navSum = this.slides[this.slides.length - 1].offsetLeft //最后一个slide的位置

      // clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
      navWidth = 0
      for (i = 0; i < this.slides.length; i++) {
        navWidth += parseInt(this.slides.eq(i).css('width'))
      }

      topBar = this.$el.parents('body').find('#top') //页头

    }
  }
})

var pageSwiper = new Swiper('#page', {
  watchSlidesProgress: true,
  resistanceRatio: 0,
  on: {
    touchMove: function () {
      progress = this.progress
      bar.transition(0)
      bar.transform('translateX(' + navSum * progress + 'px)')
      for (i = 0; i < this.slides.length; i++) {
        slideProgress = this.slides[i].progress
        if (Math.abs(slideProgress) < 1) {
          navSwiper.slides.eq(i).find('span').css('color', '#c00208')
        }
      }
    },
    transitionStart: function () {
      activeIndex = this.activeIndex
      activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft
      //释放时导航条移动过渡
      bar.transition(tSpeed)
      bar.transform('translateX(' + activeSlidePosition + 'px)')
      //释放时文字变色过渡
      navSwiper.slides.eq(activeIndex).find('span').transition(tSpeed)
      navSwiper.slides.eq(activeIndex).find('span').css('color', '#c00208')
      if (activeIndex > 0) {
        navSwiper.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
        navSwiper.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(51,51,51,1)')
      }
      if (activeIndex < this.slides.length) {
        navSwiper.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
        navSwiper.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(51,51,51,1)')
      }
      //导航居中
      // navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft

      // navSwiper.setTransition(tSpeed)
      // if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
      //   navSwiper.setTranslate(0)
      // } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
      //   navSwiper.setTranslate(clientWidth - navWidth)
      // } else {
      //   navSwiper.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
      // }

    }
  }
})

navSwiper.on('tap', function (e) {
  clickIndex = this.clickedIndex
  clickSlide = this.slides.eq(clickIndex)
  pageSwiper.slideTo(clickIndex)
  this.slides.find('span').css('color', 'rgba(51,51,51,1)')
  clickSlide.find('span').css('color', '#c00208')
})

var areaSwiper = new Swiper('.area-swiper', {
  pagination: {
    el: '.area-pagination'
  }
})

var rySwiper = new Swiper('.ry-swiper', {
  autoplay: true,
  pagination: {
    el: '.ry-pagination'
  }
})

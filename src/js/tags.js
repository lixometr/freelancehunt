export class Tags {
    constructor(el) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el
        this.moreBtn = this.el.querySelector('.tags-more')
        this.init()
    }
    showMore() {
        
    }
    init() {
        this.moreBtn.addEventListener('click', e => {
            e.preventDefault()
            this.showMore()
        })
    }
}
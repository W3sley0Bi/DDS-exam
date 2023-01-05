const template = document.createElement("template")
template.innerHTML = `
<style>
h3{
    color: red;
     
}
</style>
<div class= "app-example">
    <img/>
    <div>
        <h3> </h3>
        <p class="info">INFO
        <slot class="info" name = "email"/>
        </p>
        <button>hide info </button>
    <div>
 </div>

`

class appExample extends HTMLElement{
    constructor(){
        super();
        this.showInfo = true;
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }
    toggleInfo(){
        this.showInfo = !this.showInfo
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('button')
        if(this.showInfo){
            info.style.display ="block"
            toggleBtn.innerText = "hide info"
        }else{
            info.style.display = "none"
            toggleBtn.innerText = "show info"
        }

    }
    connectedCallback(){
        this.shadowRoot.querySelector('button').
        addEventListener('click',()=> 
            this.toggleInfo()
        )
    }
    disconnectedCallback(){
        this.shadowRoot.querySelector('button').
        removeEventListener()
    }
}
 
customElements.define('app-example', appExample);
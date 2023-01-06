const template = document.createElement("template")
template.innerHTML = `

<style>
body {
  width: 1080px;
  margin: auto;
}

#grid {
  display: grid;
  grid-template-columns: auto auto auto;
}

.product {
  max-width: 340px;
  margin: 10px;
  border: 2px solid black;
}

.image {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
</style>

<div class="product">
        <div class="image"><img /></div>
        <h3 class="title"><slot name="title"/></h3>
        <p class="price"><span><slot name="price"/></span>€</p>
        <p class="description"><slot name="description"/></p>
      </div>



`

class Product extends HTMLElement{
    constructor(){
        super();
        this.showInfo = true;
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
       // this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }
    
     
     imageCheck(){
        let img = this.shadowRoot.querySelector('img')
        console.log(this.getAttribute('avatar'))
        if(this.getAttribute('avatar') == null){
            img.src ="placeholder.png"
        }
        
        if(this.shadowRoot.querySelector('h3.title > slot').innerText == ""){
            this.shadowRoot.querySelector('h3.title > slot').innerText = "ProductName"
        }
        if(this.shadowRoot.querySelector('p.price > span > slot').innerText == ""){
            this.shadowRoot.querySelector('p.price > span > slot').innerText = "0,00"
        }
        if(this.shadowRoot.querySelector('p.description > slot').innerText == ""){
            this.shadowRoot.querySelector('p.description > slot').innerText = "Write something for the description"
        }

     }

     

    // toggleInfo(){
    //     this.showInfo = !this.showInfo
    //     const info = this.shadowRoot.querySelector('.info');
    //     const toggleBtn = this.shadowRoot.querySelector('button')
    //     if(this.showInfo){
    //         info.style.display ="block"
    //         toggleBtn.innerText = "hide info"
    //     }else{
    //         info.style.display = "none"
    //         toggleBtn.innerText = "show info"
    //     }

    // }
    connectedCallback(){
        this.imageCheck()
    }
    // disconnectedCallback(){
    //     this.shadowRoot.querySelector('button').
    //     removeEventListener()
    // }
}
 
customElements.define('app-product', Product);
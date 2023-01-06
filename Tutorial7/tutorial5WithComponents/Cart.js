const template = document.createElement("template")
template.innerHTML = `

<style>
        body {
            font: 15px normal Arial, sans-serif;
            color: #000000;
        }
        label {
            width: 5em;
            display: inline-block;
        }
        ul {
            padding: 0;
        }
        form {
            display: inline;
        }
    </style>

    <h1>Shopping Cart</h1>
    <ul id="demo">

    </ul>
    </form>
    <hr>

    <img src="cart.gif">
    <hr>
    <form method="POST" action="/cart">
        <label for="name">Name</label> <input id="name" type="text" name="name" placeholder="Name"><br>
        <label for="amount">Amount</label> <input id="amount" type="number" name="amount" placeholder="Amount"><br>
        <input type="hidden" name="action" value="add">
        <button type="submit">Add entry</button>
    </form>



`

class Cart extends HTMLElement{
    constructor(){
        super();
        this.showInfo = true;
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        //this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
       // this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
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
    // connectedCallback(){
    //     this.shadowRoot.querySelector('button').
    //     addEventListener('click',()=> 
    //         this.toggleInfo()
    //     )
    // }
    // disconnectedCallback(){
    //     this.shadowRoot.querySelector('button').
    //     removeEventListener()
    // }
}
 
customElements.define('cart-tag', Cart);
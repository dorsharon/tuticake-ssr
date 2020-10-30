export default class CupDessertsBoxSetOrderItem {
    constructor(boxSetQuantity, flavors) {
        this.boxSetQuantity = boxSetQuantity;
        this.flavors = flavors;
    }

    toHTMLString() {
        return `
            <h2>מארז ${this.boxSetQuantity} קינוחי כוסות</h2>
            
            ${this.flavors.reduce(
                (result, { name, quantity }) => `
                ${result}
                <h3>${name}: ${quantity}</h3>
            `,
                ``,
            )}
        `;
    }
}

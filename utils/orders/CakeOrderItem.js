import { I18n } from 'react-redux-i18n';

export default class CakeOrderItem {
    constructor(name, extras, notes) {
        this.name = name;
        this.extras = extras;
        this.notes = notes;
    }

    toHTMLString() {
        return `
            <h2>${this.name}</h2>
            
            ${Object.entries(this.extras).reduce(
                (result, [key, value]) => `
                ${result}
                <b>${I18n.t(`cakes.questions.${key}.question`)}</b><br/>
                <div>${value.trim() ? value : '--'}</div>
            `,
                '',
            )}
            
            <b>הערות: ${this.notes.trim() ? this.notes : '--'}</b>
        `;
    }
}

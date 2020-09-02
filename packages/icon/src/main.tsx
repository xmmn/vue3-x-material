import { defineComponent } from 'vue';

import './main.less'

export default defineComponent({
    name: 'MIcon',

    props: {
        name: {
            type: String,
            default: ''
        }
    },

    setup(props, { slots }) {
        return () => {
            return <i class="material-icons">
                {props.name}
            </i>
        }
    }
})
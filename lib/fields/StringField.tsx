import { defineComponent } from 'vue';
import { FiledPropsDefine } from '../type';

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,

  setup(props) {
    return () => {
      return (
        <div>
          <input type="text" value={props.value} onInput={props.onChange} />
        </div>
      );
    };
  },
});

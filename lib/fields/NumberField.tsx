import { defineComponent } from 'vue';
import { FiledPropsDefine } from '../type';

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,

  setup(props) {
    return () => {
      const handleChange = (e: any) => {
        const num = Number(e.target.value);

        if (num && isNaN(num)) {
          props.onChange(undefined);
        } else {
          props.onChange(num);
        }
      };
      return (
        <div>
          <input type="text" value={props.value} onInput={handleChange} />
        </div>
      );
    };
  },
});

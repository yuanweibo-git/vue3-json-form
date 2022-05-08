import { defineComponent } from 'vue';
import { FiledPropsDefine } from './type';
import SchemaItem from './SchemaItem';

export default defineComponent({
  name: 'SchemaForm',
  props: FiledPropsDefine,

  setup(props, { slots, emit, attrs }) {
    return () => {
      const handleChange = (v: any) => {
        console.log(v);
        props.onChange(v);
      };

      return <SchemaItem schema={props.schema} value={props.value} onChange={handleChange} />;
    };
  },
});

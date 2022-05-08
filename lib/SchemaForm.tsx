import { defineComponent } from 'vue';
import { FiledPropsDefine } from './type';
import SchemaItem from './SchemaItem';

export default defineComponent({
  name: 'SchemaForm',
  props: FiledPropsDefine,

  setup(props) {
    return () => {
      const handleChange = (e: any) => {
        props.onChange(e.target.value);
      };

      return <SchemaItem schema={props.schema} value={props.value} onChange={handleChange} />;
    };
  },
});

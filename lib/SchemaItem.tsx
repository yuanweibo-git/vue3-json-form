import { defineComponent } from 'vue';
import { FiledPropsDefine, SchemaTypes } from './type';
import StringField from './fields/StringField';
import NumberField from './fields/NumberField';

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,

  setup(props) {
    return () => {
      const schema = props.schema;
      const type = schema?.type;

      let component: any;

      switch (type) {
        case SchemaTypes.STRING:
          component = StringField;
          break;

        case SchemaTypes.NUMBER:
          component = NumberField;
          break;

        default:
          throw new Error(`不支持类型 ‘${type}’`);
      }

      return <component {...props} />;
    };
  },
});

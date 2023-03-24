import Iconfont from '@/components/Iconfont';
import { SettingContext } from '@/contexts/Setting';
import { noop } from '@/utils/util';
import { useUpdateEffect } from 'ahooks';
import { Drawer, Radio, Form, Switch, Divider } from 'antd';
import { useContext, useEffect, useMemo } from 'react';
import ThemeColorPicker from '../ThemeColorPicker';

interface IProps {
  open: boolean;
  onClose?: () => void;
}
interface IFormState {
  theme: 'dark' | 'light' | 'followSystem';
  compactMode: any;
  primaryColor: any;
  fixedMenu: any;
  fixedHeader: any;
  showFooter: any;
  followSystemTheme?: boolean;
}
const SettingDrawer: React.FC<IProps> = (props) => {
  const { open, onClose = noop } = props;
  const { settings, setSetting } = useContext(SettingContext);
  const [form] = Form.useForm<IFormState>();

  // 设置初始值
  const initFormState: IFormState = useMemo(() => {
    return {
      ...settings,
      theme: settings.followSystemTheme ? 'followSystem' : settings.theme,
      showFooter: undefined
    };
  }, [settings]);

  // form 元素变更, 更新系统设置
  const handleSettingFormChange = (changedValues: Partial<IFormState>, values: IFormState) => {
    const settingItems = { ...changedValues };
    // 设置外观
    const { theme } = settingItems;
    // 变更主题时, 判断是否跟随系统
    if (theme) {
      console.log('themeee', theme);

      settingItems.followSystemTheme = theme === 'followSystem';
    }
    setSetting(settingItems as typeof settings);

    console.log('chage', changedValues, values);
  };

  useUpdateEffect(() => {
    form?.setFieldsValue(initFormState);
  }, [initFormState]);
  return (
    <Drawer title="偏好设置" onClose={onClose} open={open}>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={{ ...initFormState }}
        autoComplete="off"
        onValuesChange={handleSettingFormChange}
        form={form}
      >
        {/* <Divider>外观</Divider> */}

        <Form.Item label="外观" name="theme">
          <Radio.Group buttonStyle="solid" defaultValue={initFormState.thmem}>
            <Radio.Button value="light">
              <Iconfont type="icon-theme-light" /> 浅色
            </Radio.Button>
            <Radio.Button value="dark">
              <Iconfont type="icon-theme-dark" /> 深色
            </Radio.Button>
            <Radio.Button value="followSystem">
              <Iconfont type="icon-followSystem" /> 跟随系统
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="紧凑模式" valuePropName="checked" name="compactMode">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item label="主题色" name="primaryColor">
          <ThemeColorPicker defaultSelectedColor={settings.primaryColor} />
        </Form.Item>
        <Divider>布局</Divider>
        <Form.Item label="固定头部" valuePropName="checked" name="fixedHeader">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item label="固定菜单" valuePropName="checked" name="fixedMenu">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item valuePropName="checked" label="显示页脚" name="showFootor">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SettingDrawer;
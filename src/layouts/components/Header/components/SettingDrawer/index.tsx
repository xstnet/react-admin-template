import Iconfont from '@/components/Iconfont';
import { SettingContext } from '@/contexts/Setting';
import useSystemThemeMode from '@/hooks/useSystemThemeMode';
import { noop } from '@/utils/util';
import { useUpdateEffect } from 'ahooks';
import { Drawer, Radio, Form, Switch, Divider } from 'antd';
import { useContext, useMemo } from 'react';
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

// todo: fix bugs: Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?
// 可能是 Modal引起的问题
const SettingDrawer: React.FC<IProps> = (props) => {
  const { open, onClose = noop } = props;
  const { settings, setSetting } = useContext(SettingContext);
  const [form] = Form.useForm<IFormState>();
  const [systemThemeMode] = useSystemThemeMode();

  // 设置初始值
  const initFormState: IFormState = useMemo(() => {
    return {
      ...settings,
      theme: settings.followSystemTheme ? 'followSystem' : settings.theme
    };
  }, [settings]);

  // form 元素变更, 更新系统设置
  const handleSettingFormChange = (changedValues: Partial<IFormState>, values: IFormState) => {
    const settingItems = { ...changedValues };
    // 设置外观
    const { theme, fixedMenu, fixedHeader } = settingItems;
    // 变更主题时, 判断是否跟随系统
    if (theme) {
      console.log('themeee', theme);

      settingItems.followSystemTheme = false;
      if (theme === 'followSystem') {
        settingItems.followSystemTheme = true;
        // 重置主题和系统一样
        settingItems.theme = systemThemeMode;
      }
    }
    // 固定菜单时, 头部也必须联动固定
    if (fixedMenu) {
      settingItems.fixedHeader = true;
    }
    if (fixedHeader === false) {
      settingItems.fixedMenu = false;
    }
    // todo fixedMenu时 滚动反弹效果去除
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
          <Radio.Group buttonStyle="solid">
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
        <Form.Item label="多标签页" valuePropName="checked" name="multitabMode">
          <Switch checkedChildren="启用" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item label="固定头部" valuePropName="checked" name="fixedHeader">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item
          help="固定菜单启用时, 头部也会同步固定"
          label="固定菜单"
          valuePropName="checked"
          name="fixedMenu"
        >
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item valuePropName="checked" label="显示底部" name="showFooter">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SettingDrawer;

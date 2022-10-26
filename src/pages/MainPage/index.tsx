import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.module.css';

function MainPage() {
  return (
    <View className={styles.container}>
      <Text className={'name'}>MainPage</Text>
    </View>
  );
}

export default MainPage;

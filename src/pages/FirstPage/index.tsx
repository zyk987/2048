import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import navigate from '@uni/navigate';

import logo from '../../../public/logo.png';

import styles from './index.module.css';

function FirstPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (current === 7) {
        navigate.push({
          url: '/main',
          isHash: true,
        });
      }
      setCurrent((c) => c + 1);
    }, 400);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <View className={styles.container}>
      <img src={logo} className={styles.logo} />
      <View className={styles.load}>
        <Text className={Math.floor(current % 4) === 0 ? styles.light : styles.empty} />
        <Text className={Math.floor(current % 4) === 1 ? styles.light : styles.empty} />
        <Text className={Math.floor(current % 4) === 2 ? styles.light : styles.empty} />
        <Text className={Math.floor(current % 4) === 3 ? styles.light : styles.empty} />
      </View>
    </View>
  );
}

export default FirstPage;

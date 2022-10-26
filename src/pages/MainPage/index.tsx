import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.module.css';
import Main from './main';
import classNames from 'classnames';

function MainPage() {
  const [start, setStart] = useState('开始游戏');
  const [hidden, setHidden] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [num, setNum] = useState<Array<Array<string | number>>>([[]]);

  const touchStart = (e) => {
    console.log('start');
  };
  const touchEnd = () => {
    console.log('end');
  };
  const touchMove = () => {
    console.log('move');
  };

  const gameStart = () => {
    // 游戏开始
    const main = new Main(4);
    setStart('重新开始');
    setNum(main.board.grid);
  };

  // useEffect(() => {
  //   gameStart();
  // }, []);
  return (
    <View className={styles.container}>
      <View className={styles.head}>
        <View className={styles.lside}>
          <Text className={styles.title}>2048</Text>
          <Text className={styles.play} onClick={() => gameStart()}>
            {start}
          </Text>
        </View>
        <View className={styles.rside}>
          <Text className={styles.scoreTitle}>score</Text>
          <Text className={styles.score}>{score}</Text>
        </View>
      </View>

      <View className={styles.game}>
        <View className={styles.board} onTouchStart={touchStart} onTouchEnd={touchEnd} onTouchMove={touchMove}>
          {num.map((row: Array<number | number>) => (
            <View className={styles.row}>
              {row.map((col: number | string) => (
                <View className={classNames({ [styles.cell]: true, [styles[`cellTypeOf${col}`]]: true })}>{col}</View>
              ))}
            </View>
          ))}
        </View>

        {/* <View className={game - over}>
          <Text className={nowScore}>历史最高分：{bestScore}</Text>
          <Text className={nowScore}>本次成绩：{score}</Text>
          <Text className={pro}>{endMsg}</Text>
        </View> */}
      </View>
    </View>
  );
}

export default MainPage;

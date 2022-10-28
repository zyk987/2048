import { createElement, useEffect, useRef, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.module.css';
import Main from './main';
import classNames from 'classnames';
import { GridAttribute } from './grid';

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function MainPage() {
  const [start, setStart] = useState('开始游戏');
  const mainRef = useRef<Main>();
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [num, setNum] = useState<GridAttribute[][]>([[]]);
  const [endMsg, setEndMsg] = useState('');

  const touchStart = (e) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  };
  const touchMove = (e) => {
    const touch = e.touches[0];
    touchEndX = touch.clientX;
    touchEndY = touch.clientY;
  };
  const touchEnd = () => {
    const disX = touchStartX - touchEndX;
    const absdisX = Math.abs(disX);
    const disY = touchStartY - touchEndY;
    const absdisY = Math.abs(disY);

    if (mainRef.current?.isOver()) {
      gameOver();
    } else if (Math.max(absdisX, absdisY) > 10) {
      // 0：向上、1：向右、2：向下、3：向左
      let direction;
      if (absdisX > absdisY) {
        direction = disX < 0 ? 1 : 3;
      } else {
        direction = disY < 0 ? 2 : 0;
      }
      const data = mainRef.current?.move(direction);
      if (data) updateView(data);
    }
  };

  const updateView = (data: GridAttribute[][]) => {
    let max = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (data[i][j].value !== '' && data[i][j].value > max) max = data[i][j].value as number;
      }
    }
    setNum(data);
    setScore(max);
  };

  const gameStart = () => {
    // 游戏开始
    const main = new Main(4);
    mainRef.current = main;
    setStart('重新开始');
    setOver(false);
    setNum(main.board.grid);
  };

  const gameOver = () => {
    setOver(true);
    if (score >= 2048) {
      setEndMsg('恭喜达到2048!');
    } else {
      setEndMsg('游戏结束!');
    }
  };

  useEffect(() => {
    gameStart();
  }, []);

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
          {num.map((row: GridAttribute[], i: number) => (
            <View className={styles.row} key={`row${i}`}>
              {row.map((col: GridAttribute, j: number) => (
                <View
                  className={styles.col}
                  style={{
                    top: `${(j + 1) * 20 + 140 * j}rpx`,
                    left: `${(i + 1) * 20 + 140 * i}rpx`,
                  }}
                  key={`col${j}`}
                >
                  <View
                    className={classNames({
                      [styles.cell]: true,
                      [styles[`cellTypeOf${col.value}`]]: true,
                      [styles.newCell]: col.status === 'new',
                    })}
                  >
                    {col.value}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
        {over && (
          <View className={styles.boardMask}>
            {/* <Text className={styles.nowScore}>历史最高分：{bestScore}</Text> */}
            <Text className={styles.nowScore}>本次成绩：{score}</Text>
            <Text className={styles.msg}>{endMsg}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default MainPage;

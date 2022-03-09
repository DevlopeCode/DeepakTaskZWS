import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Draggable from './Draggable';

const circleSize = width - 36;
const itemSize = width / 5;
const radius = circleSize / 2 - itemSize / 2;
const center = radius;

const App = ({navigation, route}) => {
  const [movingDraggable, setMovingDraggable] = useState(null);
  const [releaseDraggable, setReleaseDraggable] = useState(null);
  const [items, setitems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {
    setMovingDraggable(null);
    setReleaseDraggable(null);
    return () => {};
  }, [items]);

  const degToRad = deg => {
    return (deg * Math.PI) / 180;
  };

  const setup = index => {
    const dividedAngle = 360 / items.length;
    const angleRad = degToRad(270 + index * dividedAngle);
    const x = radius * Math.cos(angleRad) + center;
    const y = radius * Math.sin(angleRad) + center;
    return {x, y};
  };

  const onMovingDraggable = movingDraggable => {
    setMovingDraggable(movingDraggable);
  };

  const onReleaseDraggable = releaseDraggable => {
    setMovingDraggable(null);
    setReleaseDraggable(releaseDraggable);
  };

  const swap = (index1, index2) => {
    console.log(index1, index2);
    var arr = [...items];
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    setitems(arr);
  };

  const DataContainer = () => {
    return (
      <View style={styles.innerContainer}>
        {items.map((item, index) => {
          const {x, y} = setup(index);
          return (
            <Draggable
              key={index}
              index={index}
              movingDraggable={movingDraggable}
              onMovingDraggable={onMovingDraggable}
              releaseDraggable={releaseDraggable}
              onReleaseDraggable={onReleaseDraggable}
              swap={swap}
              renderChild={isMovedOver => {
                return (
                  <View style={styles.itemContainer}>
                    <Text style={{color: 'red'}}>{item}</Text>
                  </View>
                );
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.safeAreaView}>
      <StatusBar backgroundColor={'#20232A'} barStyle="light-content" />
      <View style={styles.viewContainer}>
        <ScrollView
          scrollEnabled={!movingDraggable}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={{
            alignSelf: 'center',
            marginVertical: height / 3.5,
          }}>
          {DataContainer()}
        </ScrollView>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  itemContainer: {
    width: width / 4,
    height: height / 8,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 5,
    borderColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

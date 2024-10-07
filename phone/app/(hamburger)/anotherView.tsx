import React, { useRef, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Alert, StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

export const agendaItems = [
  {
    title: dates[0],
    data: [{hour: '12am', duration: '1h', title: 'First Yoga'}, {hour: '9am', duration: '1h', title: 'Long Yoga', itemCustomHeightType: 'LongEvent'}],
  },
  {
    title: dates[1],
    data: [
      {hour: '4pm', duration: '1h', title: 'Pilates ABC'},
      {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'}
    ]
  },
  {
    title: dates[2],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {
    title: dates[3],
    data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]
  },
  {
    title: dates[4],
    data: [{}]
  },
  {
    title: dates[5],
    data: [
      {hour: '9pm', duration: '1h', title: 'Middle Yoga'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'}
    ]
  },
  {
    title: dates[6],
    data: [
      {hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}
    ]
  },
  {
    title: dates[7],
    data: [{}]
  },
  {
    title: dates[8],
    data: [
      {hour: '9pm', duration: '1h', title: 'Pilates Reformer'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'}
    ]
  },
  {
    title: dates[9],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {
    title: dates[10],
    data: [
      {hour: '12am', duration: '1h', title: 'Last Yoga'}
    ]
  },
  {
    title: dates[11],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'}
    ]
  },
  {
    title: dates[12],
    data: [
      {hour: '12am', duration: '1h', title: 'Last Yoga'}
    ]
  },
  {
    title: dates[13],
    data: [
      {hour: '12am', duration: '1h', title: 'Last item of the list'}
    ]
  }
];

const ITEMS: any[] = agendaItems;

interface Props {
    weekView?: boolean;
}

interface ItemProps {
    item: any;
}

const AgendaItem = (props: ItemProps) => {
  const {item} = props;

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed}/>
      </View>
    </TouchableOpacity>
  );
};



const ExpandableCalendarScreen = (props: Props) => {
    const { weekView } = props;
    const todayBtnTheme = useRef({
    });

    const renderItem = useCallback(({ item }: any) => {
        return <AgendaItem item={item} />;
    }, []);

    return (
        <CalendarProvider
            date={ITEMS[1]?.title}
            showTodayButton
            theme={todayBtnTheme.current}
        >
            {weekView ? (
                <WeekCalendar firstDay={1}  />
            ) : (
                <ExpandableCalendar
                    firstDay={1}
                />
            )}
            <AgendaList
                sections={ITEMS}
                renderItem={renderItem}
            />
        </CalendarProvider>
    );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        backgroundColor: 'lightgrey'
    },
    section: {
        color: 'grey',
        textTransform: 'capitalize'
    },
    item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
    },
    itemHourText: {
        color: 'black'
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    },
    itemTitleText: {
        color: 'black',
        marginLeft: 16,
        fontWeight: 'bold',
        fontSize: 16
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    emptyItemText: {
        color: 'lightgrey',
        fontSize: 14
    }
});
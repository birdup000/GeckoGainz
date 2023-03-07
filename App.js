import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet,FlatList, TextInput, TouchableOpacity, ScrollView, Platform, } from 'react-native';

const App = () => {
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutPaused, setWorkoutPaused] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [number, onChangeNumber] = React.useState('');
  const intervalRef = useRef(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unitSystem, setUnitSystem] = useState('metric'); // default unit system


  const exerciseList = [
    { name: 'Push-ups', requiresEquipment: false },
    { name: 'Squats', requiresEquipment: false },
    { name: 'Bench press', requiresEquipment: true },
    { name: 'Deadlifts', requiresEquipment: true },
    { name: 'Lunges', requiresEquipment: false },
    { name: 'Pull-ups', requiresEquipment: false },
    { name: 'Chin-ups', requiresEquipment: false },
    { name: 'Dips', requiresEquipment: false },
    { name: 'Plank', requiresEquipment: false },
    { name: 'Crunches', requiresEquipment: false },
    { name: 'Russian twists', requiresEquipment: false },
    { name: 'Leg press', requiresEquipment: true },
    { name: 'Calf raises', requiresEquipment: false },
    { name: 'Leg curls', requiresEquipment: true },
    { name: 'Shoulder press', requiresEquipment: true },
    { name: 'Bicep curls', requiresEquipment: false },
    { name: 'Tricep extensions', requiresEquipment: false },
    { name: 'Hammer curls', requiresEquipment: false },
    { name: 'Chest fly', requiresEquipment: true },
    { name: 'Lat pulldowns', requiresEquipment: true },
    { name: 'Seated rows', requiresEquipment: true },
    { name: 'Bent over rows', requiresEquipment: false },
    { name: 'Hip thrusts', requiresEquipment: true },
    { name: 'Good mornings', requiresEquipment: true },
    { name: 'Box jumps', requiresEquipment: true },
    { name: 'Step-ups', requiresEquipment: false },
    { name: 'Jumping jacks', requiresEquipment: false },
    { name: 'Mountain climbers', requiresEquipment: false },
    { name: 'Burpees', requiresEquipment: false },
    { name: 'Dumbbell rows', requiresEquipment: true },
    { name: 'Reverse fly', requiresEquipment: true },
    { name: 'Cable curls', requiresEquipment: true },
    { name: 'Tricep pushdowns', requiresEquipment: true },
    { name: 'Front squats', requiresEquipment: true },
    { name: 'Back squats', requiresEquipment: true },
    { name: 'Romanian deadlifts', requiresEquipment: true },
    { name: 'Sumo deadlifts', requiresEquipment: true },
    { name: 'Side lunges', requiresEquipment: false },
    { name: 'Boxing', requiresEquipment: false },
    { name: 'Kickboxing', requiresEquipment: false },
    { name: 'Swimming', requiresEquipment: false },
    { name: 'Cycling', requiresEquipment: true },
    { name: 'Running', requiresEquipment: false },
    { name: 'Jump rope', requiresEquipment: false },
    { name: 'Stair climbing', requiresEquipment: false },
    { name: 'Elliptical machine', requiresEquipment: true },
    { name: 'Rowing machine', requiresEquipment: true },
    { name: 'Battle ropes', requiresEquipment: true },
    { name: 'Kettlebell swings', requiresEquipment: true },
    { name: 'Boxing bag work', requiresEquipment: true },
    { name: 'Medicine ball throws', requiresEquipment: true },
    { name: 'Plyometric jumps', requiresEquipment: false },
    { name: 'Bear crawls', requiresEquipment: false },
    { name: 'Crab walks', requiresEquipment: false},
    
  ];

  const [showEquipment, setShowEquipment] = useState(false);

  const filteredList = showEquipment
    ? exerciseList.filter((exercise) => exercise.requiresEquipment)
    : exerciseList.filter((exercise) => !exercise.requiresEquipment);

  const startWorkout = () => {
    setWorkoutStarted(true);
    setWorkoutPaused(false);
    setWorkoutTime(0);
    intervalRef.current = setInterval(() => setWorkoutTime(prevTime => prevTime + 1), 1000);
  };

  const calculateBMI = () => {
    let BMI;
    if (unitSystem === 'imperial') {
      const weightInLbs = parseFloat(weight);
      const heightInInches = parseFloat(height);
      BMI = (weightInLbs / (heightInInches * heightInInches)) * 703;
    } else {
      const weightInKg = parseFloat(weight);
      const heightInMeters = parseFloat(height) / 100;
      BMI = weightInKg / (heightInMeters * heightInMeters);
    }
    alert(`BMI: ${BMI.toFixed(2)}`);
  };
  



   
 


  const pauseWorkout = () => {
    setWorkoutPaused(true);
    clearInterval(intervalRef.current);
  };

  const endWorkout = () => {
    setWorkoutStarted(false);
    setWorkoutPaused(false);
    setWorkoutTime(0);
    clearInterval(intervalRef.current);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Program</Text>
      <Text style={styles.countertitle}>Workout Stopwatch</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start Workout" onPress={startWorkout} disabled={workoutStarted && !workoutPaused} />
        <Button title="Pause Workout" onPress={pauseWorkout} disabled={!workoutStarted || workoutPaused} />
        <Button title="End Workout" onPress={endWorkout} disabled={!workoutStarted} />
      </View>
      {workoutStarted && (
        <View style={styles.workoutContainer}>
          <Text style={styles.workoutText}>Workout Time:</Text>
          <Text style={styles.timeText}>{formatTime(workoutTime)}</Text>
        </View>
      )}



<View style={styles.listsContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => setShowEquipment(false)}>
          <Text style={[styles.button, !showEquipment && styles.activeButton]}>Bodyweight exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEquipment(true)}>
          <Text style={[styles.button, showEquipment && styles.activeButton]}>Exercises with equipment</Text>
        </TouchableOpacity>
      </View>
      {filteredList.map((exercise) => (
        <Text key={exercise.name} style={styles.item}>{exercise.name}</Text>
      ))}
    </View>
 
<View style={styles.container}>
<View style={styles.unitSystem}>
<Button
title="Metric"
onPress={() => setUnitSystem('metric')}
color={unitSystem === 'metric' ? '#fff' : '#000'}
/>
<Button
title="Imperial"
onPress={() => setUnitSystem('imperial')}
color={unitSystem === 'imperial' ? '#fff' : '#000'}
/>
</View>
<View style={styles.inputContainer}>
<Text style={styles.label}>Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</Text>
<TextInput
style={styles.input}
keyboardType="numeric"
value={height}
onChangeText={(height) => setHeight(height)}
/>
</View>
<View style={styles.inputContainer}>
<Text style={styles.label}>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Text>
<TextInput
style={styles.input}
keyboardType="numeric"
value={weight}
onChangeText={(weight) => setWeight(weight)}
/>
</View>
<Button title="Calculate BMI" onPress={calculateBMI} />
</View>




</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  workoutContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#212121',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '90%',
  },
  workoutText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  customButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  gymImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  countertitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  listsContainer: {
    backgroundColor: '#212121',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  upperbodylist: {
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
  },
  lowerbodylist: {
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
  },
  item: {
    fontSize: 20,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  bmicalcContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: '#212121',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    height: '50%',
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitSystem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333333',
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },

  input: {
    color: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '60%',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderColor: 'blue',
    borderRadius: 20,
    color: 'white',
    backgroundColor: 'blue',
    fontSize: 16,
    fontFamily: 'Arial',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    transition: 'background-color 0.2s',
  },
  activeButton: {
    fontWeight: 'bold',
  },
});



export default App;
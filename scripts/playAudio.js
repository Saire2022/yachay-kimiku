import { Audio } from 'expo-av';

let sound = null;

export  const playAudio = async (path) => {
  if (sound) {
  sound.stopAsync();
  sound.unloadAsync();
  }
  sound = new Audio.Sound();
  try {
  await sound.loadAsync(path);
  await sound.playAsync();
  } catch (error) {
  console.log(error);
  }
};

export const stopAudio = async () => {
  if (sound) {
    await sound.stopAsync();
    sound.unloadAsync();
    sound = null;
  }
};

export default {playAudio, stopAudio};
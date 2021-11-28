import { getFromLocal } from '../localStorage'
import { storage } from './firebase'

export const uploadImagePlace = async file => {
  console.log(file)
  const storageRef = storage.ref()
  const spaceRef = storageRef.child(`places/${file.name}`)
  await spaceRef.put(file)
  const publicURL = await spaceRef.getDownloadURL()
  return publicURL
}

export const uploadImageUser = async file => {
  const storageRef = storage.ref()
  const spaceRef = storageRef.child(`places/${getFromLocal('id')}/${file.name}`)
  await spaceRef.put(file)
  const publicURL = await spaceRef.getDownloadURL()
  //const metada = await spaceRef.getMetadata()
  return publicURL
}

// get file from input event
const extractFile = (evt, user) => {
  // if no file exists, throw error
  if (!evt.target.files || evt.target.files.length == 0) {
    throw 'You must select an image to upload.'
  }
  // extract file from event
  const file = evt.target.files[0]
  // create local url for file
  const localUrl = URL.createObjectURL(file)
  // extract file extension
  const fileExtension = file.name.split('.').pop()
  // create file name to store file as
  // {user_id}-{timestamp}.{extension}
  const fileName = `${user.id}-${Date.now()}.${fileExtension}`
  return { file, localUrl, fileName, fileExtension }
}

export { extractFile }

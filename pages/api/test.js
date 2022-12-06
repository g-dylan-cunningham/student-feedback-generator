export default function handler(req, res) {
  const {
    body
  } = req;

  const myFun = (a) => console.log('wordking', a)
  res.status(200).json({ myFun: myFun })
}


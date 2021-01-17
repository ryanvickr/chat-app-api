import dotenv from "dotenv"

dotenv.config()

const config = {
    db: {
      url: process.env.MONGODB_URI,
      name: 'chatdb'
    }
}
  
export default config
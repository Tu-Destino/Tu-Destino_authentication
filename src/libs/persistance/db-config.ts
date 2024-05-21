import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      connection: "mongodb+srv://",
      host: "localhost:27017",
      name: "tuDestino",
      user: "tuDestino",
      password: "Tu.Destino.24",
        
    },
    env:'production',
  };
  return dbConfig;
});

import { MongooseModule } from "@nestjs/mongoose";

export const databaseModule = MongooseModule.forRoot(
  'mongodb://localhost/nest'
)
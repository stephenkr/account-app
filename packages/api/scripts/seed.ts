import { Seeder } from 'mongo-seeding'
import { SeederCollection } from 'mongo-seeding/dist/common'
import path from 'path'

const seeder = new Seeder({
  database: {
    name: 'nest'
  },
  dropDatabase: true
})

const collections = seeder.readCollectionsFromPath(
  path.join(__dirname, './'),
  {
    extensions: ['js', 'json', 'ts'],
    transformers: [
      (collection: SeederCollection) => {
        const seedFile = collection.documents[0] as {
          name: string;
          documents: unknown[]
        }

        const name = seedFile.name || ''
        const documents = seedFile.documents || []

        return {
          orderNo: undefined,
          name,
          documents
        }
      }
    ]
  },
)

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch((err) => {
    console.log('Error', err);
  });
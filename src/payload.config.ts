import { buildConfig } from 'payload/config';
import path from 'path';
import {cloudStorage} from "@payloadcms/plugin-cloud-storage";

import Examples from './collections/Examples';
import Users from './collections/Users';
import Media from './collections/Media';
import Posts from "./collections/Posts";
import Categories from "./collections/Categories";
import Tags from "./collections/Tags";
import {s3Adapter} from "@payloadcms/plugin-cloud-storage/s3";

const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL;

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
  },
  bucket: process.env.S3_BUCKET,
})

export default buildConfig({
  serverURL: (serverURL == 'https://') ? 'http://127.0.0.1:3000' : serverURL,
  admin: {
    user: Users.slug
  },
  collections: [Users, Media, Examples, Posts, Categories, Tags],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
  },
  upload: {
    limits: {
      fileSize: 2000000, // 2MB, written in bytes
    },
  },
  plugins: [
      cloudStorage({
        collections: {
          'media': {
            adapter: adapter
          }
        }
      })
  ]
})

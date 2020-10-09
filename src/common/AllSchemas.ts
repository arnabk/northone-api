import { loadFilesSync } from '@graphql-tools/load-files';
import { join } from 'path';

const allSchemas = loadFilesSync(join(__dirname, '..', 'schemas', '*.gql'), { recursive: true });

export default allSchemas;

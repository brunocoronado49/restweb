# REST WEB

# Dev

1. Clonar el .env.template y crear el .env
2. Ejecutar el comando `docker compose up -d`
3. Ejecutar el `npm install`
4. Para prisma, tener las bases de datos lista y ejecutar `npx prisma generate`
5. Ejecutar `npx prisma migrate dev`

# tscongif.json

Para no tener conflicto con TS esta es la configuracion inicial del archivo `tsconfig.json`

```
{
  "exclude": ["node_modules", "dist"],
  "include": ["src", "test/app.test.ts"],
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "dist/",
    "module": "commonjs",
    "target": "es2016",
    "types": ["node", "jest"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": false,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}

```

# package.json

En el archivo de `package.json` recordar no incluir los `"types": "module"/"commonjs"`

# jest.config.ts

Para la parte de los test se debe incluir el archivo `setupTest.ts` en la raiz del proyecto
y agregarlo al archivo de `jest.config.ts` ademas de `preset: "ts-jest"`, `setupFiles: ["<rootDir>/setupTest.ts"]`,
`testEnvironment: "jest-environment-node"`

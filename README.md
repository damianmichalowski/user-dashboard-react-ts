# Users Dashboard

Prosta aplikacja webowa zbudowana w **React + TypeScript** do wyświetlania użytkowników z publicznego API oraz dodawania własnych użytkowników lokalnie w aplikacji.


## Tech Stack
React + TypeScript + Vite + Zustand + React Query + Axios + Tailwind + Shadcn + Vitest



## Uruchomienie projektu lokalnie
```bash
git clone <LINK_DO_REPO>
cd <NAZWA_FOLDERU>
code .
```
w IDE
```bash
npm install
npm run dev
```

## Testy Vitest
```bash
npx vitest run src/schemas/addUserSchema.test.ts
```

## Komentarz
API jsonplaceholder - Creating a resource: resource will not be really updated on the server but it will be faked as if.
Zgodnie z powyższą informacją API, request POST nie tworzy relanego zasobu, dlatego po dostaniu odpowiedzi succes, zapisuje usera w globalnym stanie, dlatego po odświeżniu znika.
Stwierdziłem że zadanie nie wymaga użycia local storage.

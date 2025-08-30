import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {



 
  const car = await prisma.car.createMany({
    data:[ {
      make: "Toyota",
      model: "Corolla",
      year: 2020,
      plateNumber: "AB123CD"
    },{ make: "Honda", model: "Civic", year: 2021, plateNumber: "XY987ZT" },{ make: "Ford", model: "Focus", year: 2019, plateNumber: "LM456PQ" }]
  })
const result2=  await prisma.user.createMany({
    data: [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "password123"
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "securepass456"
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        password: "qwerty789"
      },
      {
        name: "Diana Prince",
        email: "diana@example.com",
        password: "wonderwoman321"
      },
      {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        password: "mission999"
      }
    ]
  })
  console.log(result2,car)
//   const result3={
//   carId     Int
//   mileage   Int
//   fuelLevel Float
//   createdAt DateTime   @default(now())

//   cars      Car[]     @relation("CarToReading")
//   incidents Incident[]
// }
}

main()
  .then(() => console.log("🌱 Database seeded!"))
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())

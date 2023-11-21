const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function isUniqueMahasiswa(nim, nama_mhs) {
  // const unique = await prisma.mahasiswa.findUnique({
  //   where: {
  //     nim: isNimSame,
  //   },
  // });
  try {
    writenim(nim, nama_mhs)
      .then(async () => {
        await prisma.$disconnect;
      })
      .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect;
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
  }
}

async function writenim(nim, nama_mhs) {
  const newMhs = await prisma.mahasiswa.create({
    data: {
      nim: nim,
      nama_mhs: nama_mhs,
    },
  });
  const mhs = await prisma.mahasiswa.findMany();
}

module.exports = writenim;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function isUniqueMahasiswa(isNimSame, nim, nama_mhs) {
  const dupe = await prisma.mahasiswa.groupBy({
    by: ["nim"],
    having: {
      _count: {
        gt: 1,
      },
    },
  });
  let isUnique = true;
  if (dupe.length > 0) {
    isUnique = false;
  }
  let isEmpty = false;

  const count = await prisma.mahasiswa.count();
  if (count === 0) {
    isEmpty = true;
  }

  if (isUnique) {
    writenim(nim, nama_mhs)
      .then(async () => {
        await prisma.$disconnect;
      })
      .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect;
        process.exit(1);
      });
    return true;
  } else {
    return false;
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

module.exports = isUniqueMahasiswa;

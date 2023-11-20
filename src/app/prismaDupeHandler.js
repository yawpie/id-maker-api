const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function isUniqueMahasiswa(isNimSame, nim, nama_mhs) {
  const unique = await prisma.mahasiswa.findUnique({
    where: {
      nim: isNimSame,
    },
  });
  if (unique) {
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

export async function writenim(nim, nama_mhs) {
  const newMhs = await prisma.mahasiswa.create({
    data: {
      nim: nim,
      nama_mhs: nama_mhs,
    },
  });
  const mhs = await prisma.mahasiswa.findMany();
}

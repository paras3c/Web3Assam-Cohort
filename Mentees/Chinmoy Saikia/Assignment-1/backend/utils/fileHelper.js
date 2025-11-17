import fs from "fs/promises";
const filePath = "./data.json";

// READ
export async function readUserData() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    await fs.writeFile(filePath, "[]", "utf8");
    return [];
  }
}

// WRITE
export async function writeUserData(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

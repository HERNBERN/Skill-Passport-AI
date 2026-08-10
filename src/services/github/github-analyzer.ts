import { githubRepos } from "@/data/demo";

/**
 * GitHub analyzer — MOCK
 *
 * TODO: Implement GitHub repository analysis
 *  - เรียก GitHub REST API จากฝั่ง server ด้วย process.env['GITHUB_TOKEN'] (อ่านภายใน handler)
 *  - ดึงภาษา, จำนวน commit, ความสม่ำเสมอ, ไฟล์สำคัญ และแปลงเป็น Evidence (commit + filePath + quote)
 *  - เคารพ rate limit ของ GitHub (ถอยเมื่อเจอ 403/429)
 */
export async function analyzeGithub(_input: { url?: string; username?: string }) {
  return { repos: githubRepos };
}

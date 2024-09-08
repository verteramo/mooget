/*******************************************************************************
 * fetchMoodleVersion.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Fetches Moodle version
 *
 * It comes from /lib/upgrade.txt endpoint, and looks like: '=== x.y.z ==='
 *
 * @param url Moodle root URL
 * @returns Moodle version as a string like 'x.y.z'
 *
 * @see https://docs.metasploit.com/api/Msf/Exploit/Remote/HTTP/Moodle/Version.html
 * @see https://stackoverflow.com/questions/11548150/getting-moodle-version-info-no-admin-access
 */
export async function fetchMoodleVersion (url: string): Promise<string | undefined> {
  const response = await fetch(`${url}/lib/upgrade.txt`)

  if (response.ok) {
    const text = await response.text()
    return text.match(/(?<====\s)\d+\.\d+(?:\.\d+)*(?=\s===)/)?.[0]
  }
}

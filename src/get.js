export default function get(from, ...selector) {
  return [...selector].map((s) => {
    return s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter((t) => t !== '')
      .reduce((acc, cur) => acc && acc[cur], from);
  });
}

import { entries, get } from "$lib/converters/index";
import { error } from "@sveltejs/kit";

export { entries };

export function load({ params }: { params: { converter: string } }) {
  if (!get(params.converter)) error(404);
  return { slug: params.converter };
}

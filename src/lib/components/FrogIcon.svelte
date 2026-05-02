<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
  }
  const { size = 24, class: className = "" }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
>
  <!-- body -->
  <ellipse cx="12" cy="15" rx="6" ry="5" />
  <!-- left eye -->
  <circle cx="8.5" cy="9" r="2.5" />
  <!-- right eye -->
  <circle cx="15.5" cy="9" r="2.5" />
  <!-- head joining eyes to body -->
  <path d="M6 11 Q8.5 13 12 12.5 Q15.5 13 18 11" />
  <!-- left front leg -->
  <path d="M6.5 15.5 L3.5 18.5" />
  <!-- right front leg -->
  <path d="M17.5 15.5 L20.5 18.5" />
  <!-- left back leg -->
  <path d="M8 19.5 L5.5 22.5" />
  <!-- right back leg -->
  <path d="M16 19.5 L18.5 22.5" />
</svg>

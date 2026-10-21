<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio content and résumé metrics live only in src/data/profile.ts; components read from it so facts stay consistent.
- The 3D scene is one fixed vanilla Three.js GPU particle canvas (src/lib/living-system.ts) morphing through six "worlds"; SceneCanvas maps scroll to a continuous progress float via data-scene section ids, without React renders per frame.

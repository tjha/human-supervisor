# Supervisor UI (Frontend)

This table looked neat, so going to use this as a base for the UI:https://www.simple-table.com/examples/hr?theme=light


## Notes
* Starting with components similar to what I've worked with in the past:
  https://cloudscape.design/
* Mobile-first approach take. ***Why?*** A majority of Frontdesk clients are
  SMBs who may have few or are the only employees. Therefore, most would expect
  to serve as a supervisor "on-the-job" away from a desktop experience.
* Strict mode was followed to help catch bugs in early development:
  https://react.dev/reference/react/StrictMode
* pnpm was selected as an efficient package manager: https://pnpm.io/
  However, since the setup uses flox as other packages, the benefits might
  be limited.
* Initial layout inspired by https://github.com/cloudscape-design/demos/
*

## Improvements
* Login experience
* Instead of using aws frontend components, it would be more ideal to have some custom components and design to 
  align with the Frontdesk branding.
* Test cases for all components
* I8n of strings
* 

## License
Significant portions of this code was built through direct use of as well as modifications to components made publically
available here: https://github.com/cloudscape-design/demos/tree/main under the MIT-0 License.

A copy of the licences from the original repository at the time of use is found in LICENSE

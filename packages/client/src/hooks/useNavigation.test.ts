import { encodeScope } from '@opencrvs/commons/client'
import {
  TAB_GROUPS,
  WORKQUEUE_TABS
} from '@client/components/interface/WorkQueueTabs'
import { getNavigationRoutes } from './useNavigation'

describe('getNavigationRoutes', () => {
  it('allows dashboard-only users to navigate without organisation scopes', () => {
    const routes = getNavigationRoutes([
      encodeScope({ type: 'performance.read' }),
      encodeScope({ type: 'performance.read-dashboards' })
    ])

    expect(routes).toContainEqual({
      name: TAB_GROUPS.performance,
      tabs: expect.arrayContaining([
        { name: WORKQUEUE_TABS.dashboard },
        { name: WORKQUEUE_TABS.performance }
      ])
    })

    expect(routes).not.toContainEqual(
      expect.objectContaining({ name: TAB_GROUPS.organisations })
    )
  })
})

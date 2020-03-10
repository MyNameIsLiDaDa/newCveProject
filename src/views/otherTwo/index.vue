<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="所属类目" block style="padding-bottom: 11px;">

          <a-form-item>
            <tag-select @change="test">
              <tag-select-option value="Category1">产商一</tag-select-option>
              <tag-select-option value="Category2">产商二</tag-select-option>
              <tag-select-option value="Category3">产商三</tag-select-option>
              <tag-select-option value="Category4">产商四</tag-select-option>
              <tag-select-option value="Category5">产商五</tag-select-option>
              <tag-select-option value="Category6">产商六</tag-select-option>
              <tag-select-option value="Category7">产商七</tag-select-option>
              <tag-select-option value="Category8">产商八</tag-select-option>
              <tag-select-option value="Category9">产商九</tag-select-option>
              <tag-select-option value="Category10">产商目十</tag-select-option>
            </tag-select>
          </a-form-item>

        </standard-form-row>

        <standard-form-row title="复选1" block>
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">类目一</tag-select-option>
              <tag-select-option value="Category2">类目二</tag-select-option>
              <tag-select-option value="Category3">类目三</tag-select-option>
              <tag-select-option value="Category4">类目四</tag-select-option>
              <tag-select-option value="Category5">类目五</tag-select-option>
              <tag-select-option value="Category6">类目六</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="复选2" block>
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">类别一</tag-select-option>
              <tag-select-option value="Category2">类别二</tag-select-option>
              <tag-select-option value="Category3">类别三</tag-select-option>
              <tag-select-option value="Category4">类别四</tag-select-option>
              <tag-select-option value="Category5">类别五</tag-select-option>
              <tag-select-option value="Category6">类别六</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="复选3" block>
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">后补一</tag-select-option>
              <tag-select-option value="Category2">后补二</tag-select-option>
              <tag-select-option value="Category3">后补三</tag-select-option>
              <tag-select-option value="Category4">后补四</tag-select-option>
              <tag-select-option value="Category5">后补五</tag-select-option>
              <tag-select-option value="Category6">后补六</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

      </a-form>
      <template v-for="(tag, index) in tags">
        <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
          <a-tag :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
            {{`${tag.slice(0, 20)}...`}}
          </a-tag>
        </a-tooltip>
        <a-tag v-else :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
          {{tag}}
        </a-tag>
      </template>
    </a-card>
    <div>
      <a-radio-group defaultValue="a" size="large">
        <a-radio-button value="a" style="margin-right: 10px;">Hangzhou</a-radio-button>
        <a-radio-button value="b" style="margin-right: 10px;">Shanghai</a-radio-button>
        <a-radio-button value="c" style="margin-right: 10px;">Beijing</a-radio-button>
        <a-radio-button value="d" style="margin-right: 10px;">Chengdu</a-radio-button>
      </a-radio-group>
    </div>
    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="data">
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
          </template>
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <template slot="description">
              <span>
                <a-tag>Ant Design</a-tag>
                <a-tag>设计语言</a-tag>
                <a-tag>蚂蚁金服</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <article-list-content
            :description="item.description"
            :owner="item.owner"
            :avatar="item.avatar"
            :href="item.href"
            :updateAt="item.updatedAt"
          />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
// import IconText from './components/IconText'
import IconText from '@/views/list/search/components/IconText'
import pick from 'lodash.pick'
const TagSelectOption = TagSelect.Option

// const owners = [
//   {
//     id: 'wzj',
//     name: '我自己'
//   },
//   {
//     id: 'wjh',
//     name: '吴家豪'
//   },
//   {
//     id: 'zxx',
//     name: '周星星'
//   },
//   {
//     id: 'zly',
//     name: '赵丽颖'
//   },
//   {
//     id: 'ym',
//     name: '姚明'
//   }
// ]

export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent,
    IconText
  },
  data () {
    return {
      // owners,
      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this),
      permissions: [],
      tags: ['已选项:'],
      newTagsChild: '' // tags新节点;
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article').then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    loadMore () {
      this.loadingMore = true
      this.$http
        .get('/list/article')
        .then(res => {
          this.data = this.data.concat(res.result)
        })
        .finally(() => {
          this.loadingMore = false
        })
    },
    setOwner () {
      const {
        form: { setFieldsValue }
      } = this
      setFieldsValue({
        owner: ['wzj']
      })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      // 有权限表，处理勾选
      if (this.mdl.permissions && this.permissions) {
        // 先处理要勾选的权限结构
        const permissionsAction = {}
        this.mdl.permissions.forEach(permission => {
          permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
        })

        console.log('permissionsAction', permissionsAction)
        // 把权限表遍历一遍，设定要勾选的权限 action
        this.permissions.forEach(permission => {
          const selected = permissionsAction[permission.id]
          permission.selected = selected || []
          this.onChangeCheck(permission)
        })

        console.log('this.permissions', this.permissions)
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'))
      })
      console.log('this.mdl', this.mdl)
    },

    onChangeCheck (permission) {
      permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll (e, permission) {
      console.log('permission:', permission)

      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    test (e) {
      console.log(e)
      console.log(this.from)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}

.list-articles-trigger {
  margin-left: 12px;
}
</style>

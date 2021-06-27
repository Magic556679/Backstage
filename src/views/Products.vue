<template>
  <div class="container">
    <Loading :active="isLoading"></Loading>
    <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td style="width: 200px">
                  <div style="height: 100px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                </td>
                <td>
                  {{ item.title }}
                </td>
                <td>
                  <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                  <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                  <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)"
                      :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                      <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                      查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
                      :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                      <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <UserProductModal
          ref="userProductModal"
          :product="product"
          @add-to-cart="addToCart"
          ></UserProductModal>
  </div>
</template>
<script>
import UserProductModal from '@/components/UserProductModal.vue'

export default {
  name: 'Products',
  data () {
    return {
      products: [],
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false,
      product: {}
    }
  },
  components: {
    UserProductModal
  },
  created () {
    this.getProducts()
  },
  methods: {
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart })
        .then((res) => {
          console.log(res)
          alert(res.data.message)
          this.isLoading = false
        })
    },
    getProducts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
          } else {
            alert(res.data.messages)
          }
        })
    },
    getProduct (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.loadingStatus.loadingItem = id
      this.$http.get(url)
        .then((res) => {
          //  清空loadingStatus  icon消失
          this.loadingStatus.loadingItem = ''
          this.product = res.data.product
          this.$refs.userProductModal.openModal()
          this.isLoading = false
        })
    }
  }
}
</script>
